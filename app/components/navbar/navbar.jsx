"use client"; 

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'; 
import { useRouter } from 'next/navigation'; 

export default function ButtonAppBar() {
  const { isSignedIn } = useUser(); 
  const router = useRouter(); 

  React.useEffect(() => {
    if (isSignedIn) {
      router.push('/home');
    }
  }, [isSignedIn, router]); 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Image src="/Frame.png" alt="logo" width="100" height="100" />
          </Typography>
          <h3>BU BİR CLONEDUR</h3>
          <SignedOut>
            <Link href="/sign-up">
              <Button sx={{ backgroundColor: "#E50914", color: "white", borderRadius: "5px", margin: "5px" }}>
                Kayıt ol
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button sx={{ backgroundColor: "#E50914", color: "white", borderRadius: "5px", margin: "5px" }}>
                Giriş Yap
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/favorites">
              <Button sx={{ backgroundColor: "#E50914", color: "white", borderRadius: "5px", margin: "5px" }}>
                Favoriler
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
    </Box>
  );
}