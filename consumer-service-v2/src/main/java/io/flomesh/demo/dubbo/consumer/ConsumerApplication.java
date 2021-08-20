package io.flomesh.demo.dubbo.consumer;


import io.flomesh.demo.dubbo.api.DemoHelloService;
import org.apache.dubbo.config.annotation.DubboReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Class DubboRegistryZooKeeperConsumerBootstrap
 *
 * @author linyang
 * @date 2021/3/30
 */

/**
 * Dubbo Registry ZooKeeper Consumer Bootstrap
 */
@SpringBootApplication
public class ConsumerApplication {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }

//    @Bean
//    public ApplicationRunner runner() {
//        return args -> logger.info(demoService.sayHello("mercyblitz"));
//    }
}
