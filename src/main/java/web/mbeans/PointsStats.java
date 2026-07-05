package web.mbeans;

import javax.management.Notification;
import javax.management.NotificationBroadcasterSupport;
import java.util.concurrent.atomic.AtomicLong;

public class PointsStats extends NotificationBroadcasterSupport implements PointsStatsMBean {
    private final AtomicLong totalPoints = new AtomicLong(0);
    private final AtomicLong hitPoints = new AtomicLong(0);
    private final AtomicLong sequenceNumber = new AtomicLong(0);

    public void registerPoint(boolean hit) {
        long total = totalPoints.incrementAndGet();

        if (hit) {
            hitPoints.incrementAndGet();
        }

        if (total % 15 == 0) {
            Notification notification = new Notification(
                    "web.points.multipleOf15",
                    this,
                    sequenceNumber.incrementAndGet(),
                    System.currentTimeMillis(),
                    "Количество установленных точек стало кратно 15: " + total
            );

            sendNotification(notification);
        }
    }

    @Override
    public long getTotalPoints() {
        return totalPoints.get();
    }

    @Override
    public long getHitPoints() {
        return hitPoints.get();
    }

    @Override
    public void reset() {
        totalPoints.set(0);
        hitPoints.set(0);
    }
}