package io.flomesh.demo.dubbo.provider.service;

/**
 * Class DefaultHelloServiceV1
 *
 * @author linyang
 * @date 2021/3/30
 */

import io.flomesh.demo.dubbo.api.DemoDateService;
import io.flomesh.demo.dubbo.api.DemoHelloService;
import io.flomesh.demo.dubbo.api.DemoTimeService;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

/**
 * Default {@link DemoHelloService}
 *
 * @see DemoHelloService
 * @since 2.7.0
 */
@DubboService(version = "${hello.service.version}")
public class DefaultHelloService implements DemoHelloService {
    @DubboReference(version = "${date.service.version}", timeout = 2000)
    private DemoDateService dateService;

    @DubboReference(version = "${time.service.version}", timeout = 2000)
    private DemoTimeService timeService;

    /**
     * The default value of ${dubbo.application.name} is ${spring.application.name}
     */
    @Value("${dubbo.application.name}")
    private String serviceName;

    @Override
    public String sayHello(String name) {
        String date = dateService.getDateOfToday();
        String time = timeService.getCurrentTime();
        return String.format("V2-[%s] : Hello, %s, Today is (%s), Time is (%s)", serviceName, name, date, time);
    }
}
