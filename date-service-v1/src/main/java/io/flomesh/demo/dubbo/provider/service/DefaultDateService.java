package io.flomesh.demo.dubbo.provider.service;

import io.flomesh.demo.dubbo.api.DemoDateService;
import org.apache.dubbo.config.annotation.DubboService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Class DefaultDateService
 *
 * @author linyang
 * @date 2021/7/2
 */
@DubboService(version = "${date.service.version}")
public class DefaultDateService implements DemoDateService {
    @Override
    public String getDateOfToday() {
        return LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
}
