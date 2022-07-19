/*
 * Academia (c) 2021, Bern University of Applied Sciences, Switzerland
 */

package people;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * The class PeopleRepository provides persistence methods for people.
 */
public class PeopleRepository {

    private static final Logger logger = Logger.getLogger(PeopleRepository.class.getName());
    private final Connection connection;

    /* SQL queries */
    private static final String FIND_ID_QUERY = "SELECT * FROM people WHERE userID=?";
    private static final String FIND_MAIL_QUERY = "SELECT * FROM people WHERE email=?";
    private static final String FIND_COORDINATORS = "SELECT * FROM people WHERE typus=?";
    private static final String GET_PASSWORD_QUERY = "SELECT passw FROM people WHERE userID=?";

    public PeopleRepository(Connection connection) {
        this.connection = connection;
    }

    public People findID(int userID) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(FIND_ID_QUERY)) {
            statement.setInt(1, userID);
            logger.info("Executing query: " + statement);
            ResultSet results = statement.executeQuery();
            if (results.next()) {
                return getUser(results);
            } else return null;
        }
    }

    public People findEmail(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(FIND_MAIL_QUERY)) {
            statement.setString(1, email);
            logger.info("Executing query: " + statement);
            ResultSet results = statement.executeQuery();
            if (results.next()) {
                return getUser(results);
            } else return null;
        }
    }

    public List<People> findAllCoordinators() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(FIND_COORDINATORS)) {
            statement.setInt(1, 1);
            logger.info("Executing query: " + statement);
            ResultSet results = statement.executeQuery();
            List<People> coordinators = new ArrayList<>();
            while (results.next()) {
                coordinators.add(getUser(results));
            }
            return coordinators;
        }
    }

    public String getPassword(int userID) throws SQLException{
        try(PreparedStatement statement = connection.prepareStatement(GET_PASSWORD_QUERY)) {
            statement.setInt(1,userID);
            ResultSet results = statement.executeQuery();
            if(results.next()){
                return results.getString("passw");
            }
            return null;
        }
    }

    /* Helper method to generate a people instance from the result set */
    private People getUser(ResultSet results) throws SQLException {
        People user = new People();
        user.setUserID((results.getInt("userID")));
        user.setType(results.getInt("typus"));
        user.setFirstName(results.getString("firstName"));
        user.setLastName(results.getString("lastName"));
        user.setEmail(results.getString("email"));
        user.setLastUpdate(results.getInt("lastUpdate"));
        return user;
    }
}
