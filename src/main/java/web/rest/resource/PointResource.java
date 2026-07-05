package web.rest.resource;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import web.models.PointData;
import web.entity.Point;
import web.security.UserPrincipal;
import web.rest.service.PointService;
import java.util.List;

@Path("/points")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PointResource {
    @Inject
    private PointService pointService;

    @POST
    public Response addPoint(PointData pointData, @Context SecurityContext securityContext) {
        UserPrincipal userPrincipal = (UserPrincipal) securityContext.getUserPrincipal();
        Point newPoint = pointService.addPoint(pointData, userPrincipal.getUser());
        return Response.status(Response.Status.CREATED).entity(newPoint).build();
    }

    @GET
    public Response getPoints(@Context SecurityContext securityContext) {
        UserPrincipal userPrincipal = (UserPrincipal) securityContext.getUserPrincipal();
        List<Point> points = pointService.getPoints(userPrincipal.getUser());
        return Response.ok(points).build();
    }
}