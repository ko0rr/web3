package web.mbeans;

public interface PointsStatsMBean {
    long getTotalPoints();
    long getHitPoints();

    void reset();
}