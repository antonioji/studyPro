package com.common.fo.security.user;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
public class AppUser implements UserDetails {

	private static final long serialVersionUID = -649022164478658137L;

	private Set<GrantedAuthority> authrities = new HashSet<GrantedAuthority>();
	private String id;
	private String password;

	private String mbrLoginId;
	private String ecCustNo;
	private String memberName;
	private String cscoId;
	private String sessionKey;
	private String role;


	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("AppUser [authrities=" + authrities);
		sb.append(", id=" + id );
		sb.append(", password=" + password);
		sb.append(", memberName=" + memberName);
		sb.append(", role=" + role);
		sb.append(", cscoId=" + cscoId);
		sb.append("]");


		return sb.toString();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.unmodifiableSet(authrities);
	}

	public Set<GrantedAuthority> getAuthrities() {
		return authrities;
	}

	public void setAuthrities(SimpleGrantedAuthority simpleGrantedAuthority) {
		this.authrities.add(simpleGrantedAuthority);
	}

	@Override
	public String getUsername() {
		return this.id;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}


	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
