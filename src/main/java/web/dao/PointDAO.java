package web.dao;

import jakarta.enterprise.context.ApplicationScoped;
import org.hibernate.Session;
import org.hibernate.Transaction;
import web.entity.Point;
import web.entity.User;
import web.models.PointData;
import web.utility.HibernateUtil;
import java.util.List;

@ApplicationScoped
public class PointDAO {

    public List<Point> findPointsCreatedByUser(User user) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from Point p where p.user = :user", Point.class)
                    .setParameter("user", user)
                    .getResultList();
        }
    }

    public void savePoint(Point point) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(point);
            transaction.commit();
        }
    }

    public Point findPointByCoordinatesAndUser(PointData point, User user) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from Point p where p.x = :x and p.y = :y and p.r =:r and p.user = :user", Point.class)
                    .setParameter("x", point.getX())
                    .setParameter("y", point.getY())
                    .setParameter("r", point.getR())
                    .setParameter("user", user)
                    .uniqueResult();
        }
    }
}