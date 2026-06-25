// src/hooks/useAuth.ts
// BELANGRIJK: Dit is een placeholder voor demonstratiedoeleinden.
// Vervang dit door je daadwerkelijke authenticatie-logica (bijv. Supabase auth).
export const useAuth = () => {
  // In een echte applicatie haal je de user en zijn rollen op uit je auth context.
  // Voor nu simuleren we een ingelogde superadmin.
  // Verander 'superadmin' naar 'user' om de beveiliging te testen.
  const user = {
    isLoggedIn: true,
    roles: ['superadmin'], // of ['user']
  };

  const hasRole = (role: string) => {
    return user.roles.includes(role);
  };

  return { user, hasRole };
};