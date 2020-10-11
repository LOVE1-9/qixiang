package com.wxdemo.util;

public class ResultBody {

	private Integer status;
    private String msg;
    private Object obj;
    
    //定义状态码
    public static ResultBody build() {
        return new ResultBody();
    }

    public static ResultBody ok(String msg) {
        return new ResultBody(200, msg, null);
    }

    public static ResultBody ok(String msg, Object obj) {
        return new ResultBody(200, msg, obj);
    }

    public static ResultBody error(String msg) {
        return new ResultBody(500, msg, null);
    }

    public static ResultBody error(String msg, Object obj) {
        return new ResultBody(500, msg, obj);
    }

    //定义构造方法
    private ResultBody() {
    }

    private ResultBody(Integer status, String msg, Object obj) {
        this.status = status;
        this.msg = msg;
        this.obj = obj;
    }
    
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}
    
}
