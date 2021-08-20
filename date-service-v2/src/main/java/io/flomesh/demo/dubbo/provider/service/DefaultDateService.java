package io.flomesh.demo.dubbo.provider.service;

import io.flomesh.demo.dubbo.api.DemoDateService;
import org.apache.dubbo.config.annotation.DubboService;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Class DefaultDateService
 *
 * @author linyang
 * @date 2021/7/2
 */
@DubboService(version = "${date.service.version}")
public class DefaultDateService implements DemoDateService {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("EEE, yyyy-MMM-dd");
    @Override
    public String getDateOfToday() {
        return ZonedDateTime.now().format(FORMATTER);
    }
}