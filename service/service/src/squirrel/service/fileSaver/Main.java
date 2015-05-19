package squirrel.service.fileSaver;

import java.io.BufferedReader;
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

	private static final int numberOfThreads = 100;
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

		String uuid;
		;
		ServerSocket socket = null;
		try {
			socket = new ServerSocket(port);
			while (true) {
				final Socket connection = socket.accept();
				Runnable task = new Runnable() {
					@Override
					public void run() {
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
		// PrintWriter out;
		try {
			in = new BufferedReader(new InputStreamReader(
					socket.getInputStream()));

			/**
			 * reads the input line for line
			 */
			for (String thisLine = in.readLine(); thisLine != null; thisLine = in
					.readLine()) {
				System.out.println(thisLine);

				/**
				 * filters the url and save it into a json
				 */
				if (thisLine.contains(urlFilter)) {

					String url = URLDecoder.decode(thisLine.substring(
							thisLine.indexOf('?') + 4, thisLine.length() - 9),
							"UTF-8");
					System.out.println("Time: " + new Date().getTime());
					String uuid = UUID.randomUUID().toString();
					String date = new Date().toString();
					String jSonObject;
					String jSonURL = "\"url\": \"" + url + "\", ";
					String jSonUuid = "\"uuid\": \"" + uuid + "\", ";
					String jSonDate = "\"date\": \"" + date + "\"";
					jSonObject = "{ " + jSonURL + jSonUuid + jSonDate + " }";
					PrintWriter writer = new PrintWriter(
							"G:/Uni/Internship/Project/test.json", "UTF-8");
					// todo delete if not needed anymore
					writer.println(jSonObject);
					writer.close();
					System.out.println(jSonObject);

				}
			}
			/*
			 * out = new PrintWriter(socket.getOutputStream(), true);
			 * out.println("HTTP/1.0 200");
			 * out.println("Content-type: text/html");
			 * out.println("Server-name: squirrel"); String response =
			 * "<html><head></head></html>"; out.println("Content-length: " +
			 * response.length()); out.println(""); out.println(response);
			 * out.flush(); out.close();
			 */
			socket.close();
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (socket != null) {
				try {
					socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return;
	}
}