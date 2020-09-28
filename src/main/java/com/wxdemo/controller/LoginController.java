package com.wxdemo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.druid.util.HttpClientUtils;
import com.wxdemo.util.ResultBody;

import cn.hutool.http.Header;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Api(value="/login",tags="Login",description="登录")
public class LoginController {

	@GetMapping("/login")
	@ApiOperation(value="登录",notes="根据小程序传来的code来调用微信接口来获取openid")
	@ApiImplicitParam(value="code",type="String")
	public ResultBody login(String code) throws Exception {
		String url = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code";
		Map<String,Object> params = new HashMap<String,Object>();
		Map<String,Object> resMap = new HashMap<String,Object>();
		//小程序ID
		params.put("appid", "wxf50778b93ee57025");
		//小程序密钥
		params.put("secret","a6e0d5a21feef414577c7ee0c405d930");
		params.put("js_code",code);
		params.put("grant_type", "authorization_code");
		String re = null;
		try {
          re= HttpUtil.post(url,params);
        } catch (Exception e) {
        	e.printStackTrace();
            return ResultBody.error("第三方接口错误",e.getMessage());
        }
		log.info(re);
		
		
		return ResultBody.ok("调用成功",re);

	}
	
	
}
