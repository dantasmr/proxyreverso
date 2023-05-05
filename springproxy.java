@SpringBootApplication
public class ReverseProxyApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReverseProxyApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("path_route", r -> r.path("/get")
                        .uri("http://httpbin.org"))
                .route("host_route", r -> r.host("*.myhost.org")
                        .uri("http://httpbin.org"))
                .build();
    }
}