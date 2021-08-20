package io.flomesh.demo.dubbo.provider.service;

import io.flomesh.demo.dubbo.api.DemoTimeService;
import org.apache.dubbo.config.annotation.DubboService;

import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Class DefaultTimeService
 *
 * @author linyang
 * @date 2021/7/2
 */
@DubboService(version = "${time.service.version}")
public class DefaultTimeService implements DemoTimeService {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss Z");
    @Override
    public String getCurrentTime() {
        return ZonedDateTime.now().format(FORMATTER);
    }
}
