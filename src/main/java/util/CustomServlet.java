package util;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;


/**
 * The class util.CustomServlet extends the HttpServlets functionality with a PATCH service.
 */
public abstract class CustomServlet extends HttpServlet {

    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getMethod().equalsIgnoreCase("PATCH")){
            doPatch(request, response);
        } else {
            try {
                super.service(request, response);
            } catch (ServletException e) {
                e.printStackTrace();
            }
        }
    }

    public abstract void doPatch(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
