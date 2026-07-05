package web.mbeans;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;

@WebListener
public class MBeanRegistrar implements ServletContextListener {
    private ObjectName pointsStatsName;
    private ObjectName missRatioName;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();

            pointsStatsName = new ObjectName("web3.mbeans:type=PointsStats");
            missRatioName = new ObjectName("web3.mbeans:type=MissRatio");

            if (!mBeanServer.isRegistered(pointsStatsName)) {
                mBeanServer.registerMBean(MBeans.POINTS_STATS, pointsStatsName);
            }

            if (!mBeanServer.isRegistered(missRatioName)) {
                mBeanServer.registerMBean(MBeans.MISS_RATIO, missRatioName);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to register MBeans", e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();

            if (pointsStatsName != null && mBeanServer.isRegistered(pointsStatsName)) {
                mBeanServer.unregisterMBean(pointsStatsName);
            }

            if (missRatioName != null && mBeanServer.isRegistered(missRatioName)) {
                mBeanServer.unregisterMBean(missRatioName);
            }
        } catch (Exception ignored) {
        }
    }
}