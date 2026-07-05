package web.rest.service;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import web.logic.abstractions.Handler;
import web.entity.Point;
import web.exceptions.ApplicationException;
import web.exceptions.ApplicationError;
import web.logic.core.RequestChainExecutor;
import web.dao.PointDAO;
import web.entity.User;
import web.mbeans.MBeans;
import web.models.PointData;
import web.dto.Result;
import web.models.ResultContext;
import java.util.List;

@ApplicationScoped
public class PointService {

    @Inject
    private PointDAO pointDAO;

    private final RequestChainExecutor requestChainExecutor = new RequestChainExecutor();
    private final Handler chain = requestChainExecutor.createChain();

    public Point addPoint(PointData pointData, User user) {
        if (isSamePoint(pointData, user)) {
            throw new ApplicationException(ApplicationError.POINT_ALREADY_EXISTS);
        }

        Point point = createPoint(pointData, user);
        pointDAO.savePoint(point);

        MBeans.POINTS_STATS.registerPoint(point.isHit());
        MBeans.MISS_RATIO.registerClick(point.isHit());

        return point;
    }

    private boolean isSamePoint(PointData pointData, User user) {
        Point existingPoint = pointDAO.findPointByCoordinatesAndUser(pointData, user);
        return existingPoint != null;
    }

    public List<Point> getPoints(User user) {
        return pointDAO.findPointsCreatedByUser(user);
    }

    private Point createPoint(PointData pointData, User user) {
        ResultContext resultContext = new ResultContext();
        resultContext.getCoordinates().put("x", String.valueOf(pointData.getX()));
        resultContext.getCoordinates().put("y", String.valueOf(pointData.getY()));
        resultContext.getCoordinates().put("r", String.valueOf(pointData.getR()));
        chain.handle(resultContext);
        Result result = resultContext.getResult();
        return mapResultToPoint(result, user);
    }

    private Point mapResultToPoint(Result result, User user) {
        Point point = new Point();
        point.setX(result.x());
        point.setY(result.y());
        point.setR(result.r());
        point.setHit(result.hit());
        point.setServerTime(result.serverTime());
        point.setScriptTime(result.scriptTime());
        point.setUser(user);
        return point;
    }
}