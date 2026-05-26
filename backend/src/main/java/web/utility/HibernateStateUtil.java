package web.utility;

import jakarta.persistence.PersistenceUnitUtil;
import org.hibernate.Session;

public class HibernateStateUtil {
    private static final PersistenceUnitUtil persistenceUnitUtil = HibernateUtil.getSessionFactory().getPersistenceUnitUtil();

    public static void printEntityState(Object entity, Session session) {
        String state;
        boolean isPersistent = session.contains(entity);
        if (isPersistent) {
            state = "PERSISTENT";
        } else {
            Object id = getObjectId(entity);
            state = (id == null) ? "TRANSIENT" : "DETACHED";
        }
        System.out.println("Состояние: " + state);
    }

    public static void printEntityState(Object entity) {
        String state;
        Object id = getObjectId(entity);
        state = (id == null) ? "TRANSIENT" : "DETACHED";
        System.out.println("Состояние: " + state);
    }

    public static Object getObjectId(Object entity) {
        return persistenceUnitUtil.getIdentifier(entity);
    }
}