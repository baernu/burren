package people;


import java.util.Objects;

/**
 * The class People provides an instance of a people object.
 */
public class People {

    private int userID;
    private int type;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String salt;
    private int lastUpdate;

    public People() {
    }

    public People(int userID, int type, String firstName, String lastName, String email, int version) {
        this.userID = userID;
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.lastUpdate = version;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public int getLastUpdate() { return lastUpdate; }

    public void setLastUpdate(int lastUpdate) { this.lastUpdate = lastUpdate; }

    //TODO: Hash password
    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        People people = (People) o;
        return userID == people.userID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID);
    }

    @Override
    public String toString() {
        return "People{" +
                "userID=" + userID +
                ", type=" + type +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}


