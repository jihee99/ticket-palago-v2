package com.ex.ticket.user.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {

    @Schema(description = "회원 이메일", example = "user@test.com")
    private String username;

    @Schema(description = "회원 비밀번호", example = "1234")
    private String password;
    private String refreshToken;
}
