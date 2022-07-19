/*
 * Academia (c) 2021, Bern University of Applied Sciences, Switzerland
 */

package people;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

public class Token {

    private static final Logger logger = Logger.getLogger(Token.class.getName());

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateJWT(int userID, int type, String firstName, String lastName, String email) {
        int expiresIn = 3600000;
        return Jwts.builder()
                .claim("userID", userID)
                .claim("type", type)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("email", email)
                // Time at creation
                .setIssuedAt(Date.from(Instant.now()))
                // Time one hour from creation
                .setExpiration(Date.from(Instant.ofEpochMilli(Instant.now().toEpochMilli() + expiresIn)))
                .signWith(key)
                .compact();
    }

    public List<String> getContent(String token) {
        try {
            Jws<Claims> jws = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            if(jws.getBody().getExpiration().before(Date.from(Instant.ofEpochMilli(Instant.now().toEpochMilli())))) {
                logger.info("Token expired");
                return null;
            }
            List<String> content = new ArrayList<>();
            content.add(0, jws.getBody().get("userID").toString());
            content.add(1, jws.getBody().get("type").toString());
            content.add(2, jws.getBody().get("firstName").toString());
            content.add(3, jws.getBody().get("lastName").toString());
            content.add(4, jws.getBody().get("email").toString());
            return content;
        }
        catch (JwtException ex) {
            logger.info("Token invalid");
            return null;
        }
    }
}