package io.flomesh.demo.dubbo.consumer;

import io.flomesh.demo.dubbo.api.DemoHelloService;
import io.flomesh.demo.dubbo.dto.Message;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class ConsumerController
 *
 * @author linyang
 * @date 2021/3/30
 */
@RestController
public class ConsumerController {
    @DubboReference(version = "${hello.service.version}", timeout = 6000, parameters={"heartbeat","5000"})
    private DemoHelloService helloService;

    @PostMapping(path = "/hello", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public String hello(@RequestBody Message body) {
        return helloService.sayHello(body.getName());
    }
}
