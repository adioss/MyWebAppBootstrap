package com.adioss.bootstrap.config;

import java.util.ArrayList;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.adioss.bootstrap.domain.Role;

import static com.adioss.bootstrap.Application.DEV_PROFILE;
import static java.util.Arrays.*;
import static java.util.Collections.*;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final CorsAllowedOrigins corsAllowedOrigins;
    private final Environment environment;

    @Autowired
    public WebSecurityConfig(UserDetailsService userDetailsService, CorsAllowedOrigins corsAllowedOrigins, Environment environment) {
        this.userDetailsService = userDetailsService;
        this.corsAllowedOrigins = corsAllowedOrigins;
        this.environment = environment;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**").antMatchers("/app/**/*.{js,ico,html}");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/login", "/logout", "/cspReport", "/dist/**", "/assets/**").permitAll().antMatchers("/api/console/**")
                .hasAnyAuthority(Role.ADMIN.toString()).anyRequest().hasAnyAuthority(Role.ADMIN.toString(), Role.USER.toString()).anyRequest().authenticated()
                .and().formLogin().loginPage("/login").usernameParameter("username").passwordParameter("password").defaultSuccessUrl("/", true).and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login").and().csrf().ignoringAntMatchers("/cspReport").and()
                .cors().and().headers().contentSecurityPolicy(getPolicyDirectives());
    }

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(corsAllowedOrigins.getOrigins());
        configuration.setAllowedMethods(asList(GET.name(), POST.name(), PUT.name(), DELETE.name()));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private String getPolicyDirectives() {
        return getConcern("default-src", "'none'") + getConcern("script-src", getDevScriptSrcCspPolicy()) //
                + getConcern("connect-src", getDevConnectSrcCspPolicy()) //
                + getConcern("img-src", "'self'") //
                + getConcern("style-src", "'self'", "'unsafe-inline'", "https://opensource.keycdn.com", "https://cdnjs.cloudflare.com",
                             "https://fonts.googleapis.com", "https://cdn.jsdelivr.net") //
                + getConcern("font-src", "'self'", "https://opensource.keycdn.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com",
                             "https://fonts.gstatic.com", "https://cdn.jsdelivr.net", "data:") + "report-uri /cspReport";
    }

    private List<String> getDevScriptSrcCspPolicy() {
        List<String> result = new ArrayList<>(singletonList("'self'"));
        if (isDevProfile()) {
            result.addAll(asList("'unsafe-eval'", "'unsafe-inline'"));
        }
        result.add("https://code.jquery.com");
        result.add("https://cdn.jsdelivr.net");
        return result;
    }

    private List<String> getDevConnectSrcCspPolicy() {
        List<String> result = new ArrayList<>(singletonList("'self'"));
        if (isDevProfile()) {
            result.addAll(singletonList("ws://localhost:3000"));
        }
        return result;
    }

    private String getConcern(String concern, String... uris) {
        return concern + " " + String.join(" ", uris) + "; ";
    }

    private String getConcern(String concern, List<String> uris) {
        return concern + " " + String.join(" ", uris) + "; ";
    }

    private boolean isDevProfile() {
        return asList(environment.getActiveProfiles()).contains(DEV_PROFILE);
    }
}
