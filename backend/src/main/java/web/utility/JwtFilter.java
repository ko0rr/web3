package web.utility;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;
import web.dao.UserDAO;
import web.entity.User;
import web.dto.MessageResponse;
import web.exceptions.ApplicationError;
import web.security.UserPrincipal;
import java.security.Principal;

@Provider
public class JwtFilter implements ContainerRequestFilter {
    @Inject
    private UserDAO userDAO;

    @Inject
    private JwtUtil jwtUtil;

    private final String AUTH_SCHEME = "Bearer ";

    @Override
    public void filter(ContainerRequestContext containerRequestContext) {
        if (containerRequestContext.getUriInfo().getPath().contains("auth")) {
            return;
        }
        String authorizationHeader = containerRequestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader == null || !authorizationHeader.startsWith(AUTH_SCHEME)) {
            endWithUnauthorized(containerRequestContext, ApplicationError.NO_TOKEN.getMessage());
            return;
        }
        String token = authorizationHeader.substring(AUTH_SCHEME.length());
        String username = jwtUtil.getUsernameFromToken(token, false);
        if (username == null) {
            endWithUnauthorized(containerRequestContext, ApplicationError.INVALID_TOKEN.getMessage());
            return;
        }
        User user = userDAO.findUserByUsername(username);
        if (user == null) {
            endWithUnauthorized(containerRequestContext, ApplicationError.INVALID_TOKEN.getMessage());
            return;
        }
        UserPrincipal userPrincipal = new UserPrincipal(user);
        containerRequestContext.setSecurityContext(new SecurityContext() {
            @Override
            public Principal getUserPrincipal() {
                return userPrincipal;
            }
            @Override
            public boolean isUserInRole(String s) {
                return true;
            }
            @Override
            public boolean isSecure() {
                return true;
            }
            @Override
            public String getAuthenticationScheme() {
                return "";
            }
        });
    }

    private void endWithUnauthorized(ContainerRequestContext containerRequestContext, String message) {
        Response unauthorizedResponse = Response.status(Response.Status.UNAUTHORIZED).entity(new MessageResponse(message)).build();
        containerRequestContext.abortWith(unauthorizedResponse);
    }
}