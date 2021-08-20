package io.flomesh.demo.dubbo.provider.bootstrap;

/**
 * Class HelloApplication
 *
 * @author linyang
 * @date 2021/3/30
 */

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;

/**
 * Dubbo Registry ZooKeeper Provider Bootstrap
 *
 * @since 2.7.0
 */
@EnableAutoConfiguration
public class HelloApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder(HelloApplication.class).run(args);
    }
}
