/*
 * Academia (c) 2021, Bern University of Applied Sciences, Switzerland
 */

package filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import people.People;
import people.PeopleRepository;
import people.Token;
import util.ConnectionManager;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

/**
 * The class AuthenticationFilter is used to authenticate HTTP requests.
 */
@WebFilter(urlPatterns = "/api/*")
public class AuthenticationFilter extends HttpFilter {

	private static final Logger logger = Logger.getLogger(AuthenticationFilter.class.getName());
	private final ConnectionManager connectionManager = ConnectionManager.getInstance();

	private static final String AUTH_HEADER = "Authorization";
	private static final String AUTH_SCHEME = "Basic";

	private final Token token = new Token();

	/* Filter */
	@Override
	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		//Establish connection, initialize repositories.
		Connection connection = connectionManager.getConnection();
		PeopleRepository repository = new PeopleRepository(connection);
		try {
			//Basic auth for login endpoint
			if(request.getRequestURI().startsWith("/api/login")) {
				//Check credentials
				String[] credentialsFromHeader = getCredentials(request);
				People user = repository.findEmail(credentialsFromHeader[0]);
				String hash = repository.getPassword(user.getUserID());
				Argon2PasswordEncoder encoder = new Argon2PasswordEncoder();
				if(!encoder.matches(credentialsFromHeader[1], hash)) {
					logger.info("Wrong password");
					response.setStatus(SC_UNAUTHORIZED);
					return;
				} else {
					logger.info("User " + credentialsFromHeader[0] + " authenticated");
					request.setAttribute("email", credentialsFromHeader[0]);
				}
			}
			//Bearer auth for everything else
			else {
				String authHeader = request.getHeader(AUTH_HEADER);
				String[] headerTokens = authHeader.split(" ");
				if (!headerTokens[0].equals("Bearer")) {
					logger.info("Invalid authentication type");
					response.setStatus(SC_UNAUTHORIZED);
					return;
				} else {
					List<String> tokenContent = token.getContent(headerTokens[1]);
					request.setAttribute("token_userID", tokenContent.get(0));
					request.setAttribute("token_type", tokenContent.get(1));
					request.setAttribute("token_firstName", tokenContent.get(2));
					request.setAttribute("token_lastName", tokenContent.get(3));
					request.setAttribute("token_email", tokenContent.get(4));
				}
			}
		} catch (Exception e) {
			logger.info("Authentication failed");
			response.setStatus(SC_UNAUTHORIZED);
			return;
		}
		chain.doFilter(request,response);
	}

	/* Helper method to get basic auth credentials */
	private String[] getCredentials(HttpServletRequest request) throws Exception {
		String authHeader = request.getHeader(AUTH_HEADER);
		String[] headerTokens = authHeader.split(" ");
		if (!headerTokens[0].equals(AUTH_SCHEME)) throw new Exception();
		byte[] decoded = Base64.getDecoder().decode(headerTokens[1]);
		return new String(decoded, StandardCharsets.UTF_8).split(":");
	}
}
