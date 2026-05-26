package web.security;
import lombok.AllArgsConstructor;
import lombok.Getter;
import web.entity.User;
import java.security.Principal;

@Getter
@AllArgsConstructor
public class UserPrincipal implements Principal {
    private final User user;

    @Override
    public String getName() {
        return user.getUsername();
    }
}