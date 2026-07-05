package web.mbeans;

public interface MissRatioMBean {
    long getTotalClicks();
    long getMisses();

    double getMissPercentage();

    void reset();
}