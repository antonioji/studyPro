package com.common.fo.security.sso;


import java.net.CookieHandler;
import java.net.CookieManager;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Header;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultRedirectStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.common.model.member.Members;


@Component
public class MembersApi {
	private final Logger log = LoggerFactory.getLogger(getClass());

	private String loginUrl = "https://testmember.lpoint.com/door/sso/authUser.jsp";
	//private String loginUrl = "https://www.google.co.kr/?gfe_rd=cr&dcr=0&ei=VmEFWvm2D8WL8AXtwZnoBw";

	private static final int HTTP_MAX_POOL_NUM = 5;
	private static final int HTTP_TIMEOUT = 10;
    private static final String SET_COOKIE = "Set-Cookie";

	public Members getMembersInfo(HttpServletRequest request, HttpServletResponse response) throws Exception{

		try {
			this.getCookies(request);
		}catch(Exception ex) {
			log.error("error = {}" + ex);
		}

		return null;
    }

	private void getCookies(HttpServletRequest request) throws Exception {

		final String loginid = request.getParameter("loginid");
		final String password = this.getEncMD5(request.getParameter("password"));

		//전달하고자 하는 PARAMETER를 List객체에 담는다
		List<NameValuePair> postParams = new LinkedList<>();
		postParams.add(new BasicNameValuePair("loginid", loginid));
		postParams.add(new BasicNameValuePair("password", password));
		UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(postParams);

		CloseableHttpClient httpclient = null;
		HttpPost httpPost = null;
		CloseableHttpResponse response = null;

		try {
	        httpclient = this.createHttpClient();
	        httpPost = new HttpPost(this.loginUrl);
	        httpPost.setEntity(formEntity);

	        //UTF-8은 한글
	        httpPost.setEntity(new UrlEncodedFormEntity(postParams, "UTF-8"));
	        response = httpclient.execute(httpPost);
	        int statusCode = response.getStatusLine().getStatusCode();

	        if (statusCode == HttpStatus.SC_MOVED_TEMPORARILY) {
                //String redirectLocation = response.getFirstHeader("Location").toString();
                //HttpEntity entity = response.getEntity();
	        	Header[] headers = response.getHeaders(SET_COOKIE);

	        	log.debug("headers : {}", headers.toString());
            }

	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	    	response.close();
	    	httpclient.close();
	    }
	}

	private CloseableHttpClient createHttpClient()
            throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
        SSLContextBuilder builder = SSLContexts.custom();
        builder.loadTrustMaterial(null, (chain, authType) -> true);

        SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build());

        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder
                .<ConnectionSocketFactory> create().register("https", sslsf)
                .build();

        // setup connection pool
        PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
        connManager.setDefaultMaxPerRoute(HTTP_MAX_POOL_NUM);
        connManager.setMaxTotal(HTTP_MAX_POOL_NUM);

        // make sure cookies is turn on
        CookieHandler.setDefault(new CookieManager());

        // setup connection timeout
        int timeout = HTTP_TIMEOUT;
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(timeout * 1000)
                .setConnectionRequestTimeout(timeout * 1000)
                .setSocketTimeout(timeout * 1000).build();

        builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
        CloseableHttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(config)
                .setConnectionManager(connManager)
                .setRedirectStrategy(new DefaultRedirectStrategy() {
                    @Override
                    protected boolean isRedirectable(String arg0) {
                        return false;
                    }

                })
                .build();
        return httpClient;
    }

	private String getEncMD5(String txt) throws Exception {

	    StringBuffer sbuf = new StringBuffer();

	    MessageDigest mDigest = MessageDigest.getInstance("MD5");
	    mDigest.update(txt.getBytes());

	    byte[] msgStr = mDigest.digest() ;

	    for(int i=0; i < msgStr.length; i++){
	        String tmpEncTxt = Integer.toHexString((int)msgStr[i] & 0x00ff) ;
	        sbuf.append(tmpEncTxt) ;
	    }
	    return sbuf.toString() ;
	}
}