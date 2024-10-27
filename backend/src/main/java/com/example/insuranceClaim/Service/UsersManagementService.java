package com.example.insuranceClaim.Service;

import com.example.insuranceClaim.Dto.ReqRes;
import com.example.insuranceClaim.Model.Users;
import com.example.insuranceClaim.Repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;

@Service
public class UsersManagementService {
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            if (usersRepo.findByUsername(registrationRequest.getUsername()).isPresent()) {
                resp.setStatusCode(409);
                resp.setError("Username already exists. Please choose a different username.");
                return resp;
            }

            if (usersRepo.findByEmail(registrationRequest.getEmail()).isPresent()) {
                resp.setStatusCode(409);
                resp.setError("An account with this email already exists. Please use a different email.");
                return resp;
            }

            Users user = new Users();
            user.setPhoneNumber(registrationRequest.getPhoneNumber());
            user.setEmail(registrationRequest.getEmail());
            user.setUsername(registrationRequest.getUsername());
            user.setRole(registrationRequest.getRole());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            Users currentUser = usersRepo.save(user);
            if (currentUser.getId() > 0) {
                resp.setUser(currentUser);
                resp.setMessage("User saved successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                    loginRequest.getPassword()));
            var user = usersRepo.findByUsername(loginRequest.getUsername()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully logged in");
        } catch (UsernameNotFoundException e) {
            response.setStatusCode(404);
            response.setError("Invalid credentials. Please check your username and password.");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes req) {
        ReqRes resp = new ReqRes();
        try {
            String userName = jwtUtils.extractUsername(req.getToken());
            Users users = usersRepo.findByUsername(userName).orElseThrow();
            if (jwtUtils.isTokenValid(req.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                resp.setStatusCode(200);
                resp.setToken(jwt);
                resp.setRefreshToken(req.getToken());
                resp.setExpirationTime("24Hr");
                resp.setMessage("Successfully refreshed token");
            }
            resp.setStatusCode(200);
            return resp;
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage(e.getMessage());
            return resp;
        }
    }

    public boolean deleteAdminByUsername(String username) {
        try {
            usersRepo.deleteByUsername(username);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

}
