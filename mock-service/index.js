const LISTEN_PORT = 9001;

const SERVICES = {
  'canary-router': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        defaultTarget: "consumer-service-v1:8090",
        canary: {
          v1: "consumer-service-v1:8090",
          v2: "consumer-service-v2:8090",
        },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'hello-service-v1': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'date-service-v1': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'time-service-v1': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'consumer-service-v1': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [],
  },

  'hello-service-v2': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'date-service-v2': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'time-service-v2': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [
      {
        when: metrics => (metrics.counts.dubbo.error / metrics.counts.dubbo.total) >= 0.5,
        apply: () => ({ rateLimit: 800 }),
        applyAfter: 15,
        resetAfter: 30,
      }
    ],
  },

  'consumer-service-v2': {
    config: {
      inbound: {
        // whitelist: [],
        // blacklist: [],
        // circuitBreak: false,
        // rateLimit: 0,
        // dataLimit: 0,
        // canary: {
        //   time: 1622949797851,
        //   duration: 3600,
        //   target: '127.0.0.1:30881',
        // },
        // cache: {
        //   size: 1000,
        // },
      },
      outbound: {
        // rateLimit: 0,
        // dataLimit: 0,
      },
    },
    rules: [],
  }
};

const configVersions = {};
const serviceMonitors = {};

function getConfigVersion(id) {
  let version = configVersions[id];
  if (!version) {
    version = Date.now();
    configVersions[id] = version;
  }
  return version;
}

function getConfig(id) {
  const baseConfig = SERVICES[id]?.config;
  const config = {
    version: getConfigVersion(id),
    inbound: { ...baseConfig.inbound },
    outbound: { ...baseConfig.outbound },
  };
  serviceMonitors[id]?.forEach?.(
    monitor => {
      const patch = monitor.configPatch;
      if (patch) Object.assign(config.inbound, patch);
    }
  );
  return config;
}

function monitorMetrics(id, metrics) {
  const rules = SERVICES[id]?.rules;
  if (!rules) return;

  let monitors = serviceMonitors[id];
  if (!monitors) {
    monitors = rules.map(
      () => ({
        active: false,
        lastTimeChanged: Date.now(),
        configPatch: null,
      })
    );
    serviceMonitors[id] = monitors;
  }

  const now = Date.now();
  rules.forEach(
    (rule, i) => {
      const monitor = monitors[i];
      const active = Boolean(rule.when(metrics));
      if (active !== monitor.active) {
        monitor.active = active;
        monitor.lastTimeChanged = now;
      }
      const elapsed = (now - monitor.lastTimeChanged) / 1000;
      if (active && elapsed >= rule.applyAfter) {
        if (monitor.configPatch === null) {
          monitor.configPatch = rule.apply();
          configVersions[id] = now;
          console.log(`Service ${id} Rule #${i} applied`);
        }
      } else if (!active && elapsed >= rule.resetAfter) {
        if (monitor.configPatch !== null) {
          monitor.configPatch = null;
          configVersions[id] = now;
          console.log(`Service ${id} Rule #${i} reset`);
        }
      }
    }
  );
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/services/:id/config/version', function (req, res) {
  res.send(getConfigVersion(req.params.id).toString());
});

app.get('/services/:id/config', function (req, res) {
  res.send(JSON.stringify(getConfig(req.params.id)));
});

app.post('/services/:id/metrics', function (req, res) {
  monitorMetrics(req.params.id, req.body);
  res.send('OK');
});

app.listen(LISTEN_PORT);
console.log(`Listening on port ${LISTEN_PORT}`);