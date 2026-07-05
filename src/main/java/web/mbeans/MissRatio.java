package web.mbeans;

import java.util.concurrent.atomic.AtomicLong;

public class MissRatio implements MissRatioMBean {
    private final AtomicLong totalClicks = new AtomicLong(0);
    private final AtomicLong misses = new AtomicLong(0);

    public void registerClick(boolean hit) {
        totalClicks.incrementAndGet();

        if (!hit) {
            misses.incrementAndGet();
        }
    }

    @Override
    public long getTotalClicks() {
        return totalClicks.get();
    }

    @Override
    public long getMisses() {
        return misses.get();
    }

    @Override
    public double getMissPercentage() {
        long total = totalClicks.get();

        if (total == 0) {
            return 0.0;
        }

        return misses.get() * 100.0 / total;
    }

    @Override
    public void reset() {
        totalClicks.set(0);
        misses.set(0);
    }
}

