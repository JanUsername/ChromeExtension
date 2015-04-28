package squirrel.service.fileSaver;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class Main {

	private static final int numberOfThreads = 100;
	private static final int port = 8195;
	private static final Executor threadPool = Executors.newFixedThreadPool(numberOfThreads);

	public static void main(String[] args) throws IOException {
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

	private static void HandleRequest(Socket socket) {
		BufferedReader in;
		PrintWriter out;
		try {
			in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

			
			for(String thisLine = in.readLine(); thisLine != null; thisLine = in.readLine()){
				System.out.println(thisLine);
				if (thisLine.contains("/?url")) {
					String url = URLDecoder.decode(thisLine.substring(thisLine.indexOf('=') + 1, thisLine.length() - 9), "UTF-8");
					System.out.println("URL: " + url);
				}
			}
			

			out = new PrintWriter(socket.getOutputStream(), true);
			out.println("HTTP/1.0 200");
			out.println("Content-type: text/html");
			out.println("Server-name: squirrel");
			String response = "<html><head></head></html>";
			out.println("Content-length: " + response.length());
			out.println("");
			out.println(response);
			out.flush();
			out.close();
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