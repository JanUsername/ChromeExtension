package squirrel.service.fileSaver;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class Main {

//	private static final int numberOfThreads = 100;
	private static final int port = 8195;
	private static final Executor threadPool = Executors
			.newFixedThreadPool(numberOfThreads);

	/**
	 * creates a socket which waits for an URL as input the creates a json with
	 * it and an uuid and a timestamp in form of a date
	 * 
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {

		ServerSocket socket = null;
		try {
			socket = new ServerSocket(port);
			while (true) {
				final Socket connection = socket.accept();
				Runnable task = new Runnable() {
					@Override
					public void run() {
						System.out.println("got a request to handle");
						HandleRequest(connection);
					}
				};
				threadPool.execute(task);
			}
		} finally {
			socket.close();
		}
	}

	/**
	 * reads the input stream as a buffered reader and filters out the url
	 * 
	 * @param socket
	 */
	private static void HandleRequest(Socket socket) {
		String urlFilter = "/?url";
		BufferedReader in;
		String homeFolder;
		String squirrelFolderPath;
		String outboxFolderPath;
//		 PrintWriter out;
		try {
			in = new BufferedReader(new InputStreamReader(
					socket.getInputStream()));
			PrintWriter writer = null;
			/**
			 * reads the input line for line
			 */
			System.out.println("recieved input");
			for (String thisLine = in.readLine(); thisLine != null; thisLine = in
					.readLine()) {
				/**
				 * filters the url and save it into a json
				 */
				if (thisLine.contains(urlFilter)) {
					
					//decodes the url
					String url = URLDecoder.decode(thisLine.substring(
							thisLine.indexOf('?') + 4, thisLine.length() - 9),
							"UTF-8");
					System.out.println("found url:" + url);
					
					//variables for creating the json
					String uuid = UUID.randomUUID().toString();
					long date = new Date().getTime();
					String jSonObject;
					String jSonURL = "\"url\": \"" + url + "\", ";
					String jSonDate = "\"date\": \"" + date + "\"";
					jSonObject = "{ " + jSonURL +  jSonDate + " }";
					
					//create the printwirter and what you need to save the json
					
					homeFolder = System.getProperty("user.home");
					squirrelFolderPath = homeFolder + "\\Squirrel";
					outboxFolderPath = squirrelFolderPath + "\\Outbox";
					File folderSquirrel = new File(squirrelFolderPath);
					File folderOutbox = new File(outboxFolderPath);
					String jsonPath = outboxFolderPath + "\\" + uuid+ ".json";
					
					System.out.println(jsonPath);
					
					//write the json, and creates the folder if they do not exist
					if (folderOutbox.exists()) {
						// save json here
						writer = new PrintWriter(jsonPath, "UTF-8");
					} else if (folderSquirrel.exists()) {
						new File(outboxFolderPath).mkdirs();
						writer = new PrintWriter(jsonPath, "UTF-8");
					} else {
						new File(outboxFolderPath).mkdirs();
						writer = new PrintWriter(jsonPath, "UTF-8");
					}

					writer.println(jSonObject);
					writer.flush();
					}
			}
			
//			  out = new PrintWriter(socket.getOutputStream(), true);
//			  out.println("HTTP/1.0 200");
//			  out.println("Content-type: text/html");
//			  out.println("Server-name: squirrel"); String response =
//			  "<html><head></head></html>"; out.println("Content-length: " +
//			  response.length()); out.println(""); out.println(response);
//			  out.flush(); out.close();
			  writer.close();
			socket.close();
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (socket != null) {
				try {
					System.out.println("this socket is closed now");
					socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return;
	}
}