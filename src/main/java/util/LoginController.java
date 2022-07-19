package util;/*
 * Academia (c) 2021, Bern University of Applied Sciences, Switzerland
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import people.People;
import people.PeopleRepository;
import people.Token;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import static jakarta.servlet.http.HttpServletResponse.SC_OK;
import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

@WebServlet("/api/login")
public class LoginController extends HttpServlet {

    private static class TokenResponse {
        private final String token;

        public TokenResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return this.token;
        }
    }

    private static final Logger logger = Logger.getLogger(LoginController.class.getName());
    private final ConnectionManager connectionManager = ConnectionManager.getInstance();
    private final ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();

    private final Token token = new Token();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Connection connection = connectionManager.getConnection();
        PeopleRepository repository = new PeopleRepository(connection);
        try {
            People user = repository.findEmail(request.getAttribute("email").toString());
            String tokenString = token.generateJWT(user.getUserID(), user.getType(), user.getFirstName(), user.getLastName(), user.getEmail());
            if(tokenString == null) {
                connection.rollback();
                response.setStatus(SC_UNAUTHORIZED);
                objectMapper.writeValue(response.getOutputStream(), "people.Token invalid");
            }
            logger.info("people.Token generated");
            response.setStatus(SC_OK);
            response.setContentType("application/json");
            /* Use this instead of "objectMapper.writeValue(response.getOutputStream(), tokenString);"
               to get a JSONObject in the response.
            JSONObject token = new JSONObject();
            token.put("token:", tokenString);
            objectMapper.writeValue(response.getOutputStream(), token);
             */
            TokenResponse tokenResp = new TokenResponse(tokenString);
            objectMapper.writeValue(response.getOutputStream(), tokenResp);
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
            response.setStatus(SC_UNAUTHORIZED);
            objectMapper.writeValue(response.getOutputStream(), "Credentials missing or invalid");
        } finally {
        connectionManager.close(connection);
        }
    }
}
