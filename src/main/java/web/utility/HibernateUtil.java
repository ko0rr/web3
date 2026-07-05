package web.utility;

import lombok.Getter;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    @Getter
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            String dbUrl = System.getenv("POSTGRES_URL");
            String dbUser = System.getenv("POSTGRES_USER");
            String dbPass = System.getenv("POSTGRES_PASSWORD");
            Configuration cfg = new Configuration();
            cfg.configure("hibernate.cfg.xml");
            cfg.setProperty("hibernate.connection.url", dbUrl);
            cfg.setProperty("hibernate.connection.username", dbUser);
            cfg.setProperty("hibernate.connection.password", dbPass);
            return cfg.buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Ошибка инициализации: " + ex.getMessage());
            throw new ExceptionInInitializerError(ex);
        }
    }
}
