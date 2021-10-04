import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

@Path("/items")
public class ListItemsService {
    
    private List<String> list;
    
    public ListItemsService() {
    	list = new CopyOnWriteArrayList<String>();
    }
    
    @GET
    public Response getList() {
        Gson gson = new Gson();
        
        return Response.ok(gson.toJson(list)).build();
    }
    
    @GET
    @Path("{id: [0-9]+}")
    public Response getListItem(@PathParam("id") String id) {
    	int i = Integer.parseInt(id);
        
        return Response.ok(list.get(i)).build();
    }
    
    @POST
    public Response postListItem(@FormParam("newEntry") String entry) {
    	if(list.size() < 10)
    		list.add(0, entry);
    	else
    		throw new IndexOutOfBoundsException();
        
        return Response.ok().build();
        
    }
    
    @DELETE
    public Response deleteList() {
        list.clear();
        
        return Response.ok().build();
    }
    
    @DELETE
    @Path("{id: [0-9]+}")
    public Response deleteListItem(@PathParam("id") String id) {
    	int i = Integer.parseInt(id);

    	return Response.ok(list.remove(i)).build();
    }
}
