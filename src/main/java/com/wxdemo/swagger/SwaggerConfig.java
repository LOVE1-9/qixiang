package com.wxdemo.swagger;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
 
/**
 * swagger2配置类
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.wxdemo"))
                .paths(PathSelectors.any())
                .build();
    }
 
 
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
        		//标题
                .title("wxdemo API文档")
                //信息
                .description("微信小程序七巷摄影接口文档")
                //维护人
                .contact(new Contact("水手森巴", "http://www.shuishou.cn", "shuishousenba@163.com"))
                //服务条款utl
                .termsOfServiceUrl("http://www.shuishou.com")
                //版本
                .version("1.0")
                .build();
    }
}