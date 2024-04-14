package com.ex.ticket.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.ex.ticket.common.PalagoStatic;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
	// 권한이나 인증이 필요한 특정 주소를 요청했을 때 authorization filter 타게 되어있음

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {
		super.doFilterInternal(request, response, chain);
		System.out.println("인증이나 권한이 필요한 주소가 요청됨");

		// String header 값을 확인한다.
		String header = request.getHeader(PalagoStatic.AUTH_HEADER);
		System.out.println("header : "+header);
	}
}