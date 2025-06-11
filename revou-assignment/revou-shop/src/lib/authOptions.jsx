import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        const usersRes = await fetch('https://api.escuelajs.co/api/v1/users');
        const users = await usersRes.json();

        const user = users.find(u => u.email === credentials.email);

    
        if (user && user.password === credentials.password) { 
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar 
          };
        } else if (user) {
          
          throw new Error("Incorrect password");
        } else {
          
          try {
            const createUserRes = await fetch('https://api.escuelajs.co/api/v1/users/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: credentials.email.split('@')[0], 
                email: credentials.email,
                password: credentials.password,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${credentials.email.split('@')[0]}` // Placeholder avatar
              })
            });
            if (!createUserRes.ok) {
              const errorData = await createUserRes.json();
              throw new Error(errorData.message || "Failed to create user");
            }
            const newUser = await createUserRes.json();
            console.log("New user created:", newUser); // Log for debugging
            return {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              image: newUser.avatar
            };
          } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to authenticate or register. Please try again.");
          }
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};