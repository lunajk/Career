import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TimerIcon from "@mui/icons-material/Timer";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export default function HomePage() {
  const navigate = useNavigate();
const scrollToFeatures = () => {
  document
    .getElementById("features")
    ?.scrollIntoView({
      behavior: "smooth",
    });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const features = [
  {
    title: "Subject Tracking",
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    desc: "Track study progress to improve.",
  },
  {
    title: "Exam Planner",
    icon: <EventIcon sx={{ fontSize: 40 }} />,
    desc: "Manage exam schedules ",
  },
  {
    title: "Daily Goals",
    icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
    desc: "Stay productive and creative.",
  },
  {
    title: "Focus Timer",
    icon: <TimerIcon sx={{ fontSize: 40 }} />,
    desc: "Boost concentration frequently",
  },
];
  return (
    <>
      {/* NAVBAR */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Toolbar>
<Box
  onClick={scrollToTop}
  sx={{
    flexGrow: 1,
    cursor: "pointer",
  }}
>
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      px: 3,
      py: 1,
      borderRadius: "999px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)",
    }}
  >
    <Typography
      sx={{
        color: "#60A5FA",
        fontWeight: 700,
        fontSize: "0.85rem",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      🔥 Next Generation Study Dashboard
    </Typography>
  </Box>
</Box>

<Button
  sx={{ color: "white" }}
  onClick={scrollToTop}
>
  Home
</Button>

<Button
  sx={{ color: "white" }}
  onClick={scrollToFeatures}
>
  Features
</Button>

<Button
  variant="contained"
  sx={{
    ml: 2,
    borderRadius: "12px",
    background:
      "linear-gradient(90deg,#60A5FA,#8B5CF6)",
  }}
  onClick={() => navigate("/dashboard")}
>
  Dashboard
</Button>
        </Toolbar>
      </AppBar>

      {/* PAGE */}

      <Box
        sx={{
          minHeight: "64vh",
          position: "relative",
          overflow: "hidden",

          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(55,57,65,0.95) 10%,
              rgba(5,8,22,0.75) 50%,
              rgba(5,8,22,0.95) 100%
            ),
            url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f")
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* PARTICLES */}

        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -700],
              opacity: [0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + i,
            }}
            style={{
              position: "absolute",
              bottom: 0,
              left: `${Math.random() * 100}%`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#60A5FA",
            }}
          />
        ))}

        {/* HERO */}

        <Container maxWidth="xl">
<Box
  sx={{
    py: 10,
    display: "flex",
    alignItems: "center",
  }}
>
            <Box maxWidth={800}>
  <Typography
    sx={{
      position: "relative",
      zIndex: 1,
      fontSize: {
        xs: "1.5rem",
        md: "3.5rem",
      },
      lineHeight: 1,
      fontWeight: 900,
      letterSpacing: "-4px",
      fontFamily: "'Space Grotesk', sans-serif",

      background:
        "linear-gradient(90deg,#FFFFFF 0%,#60A5FA 25%,#22D3EE 50%,#8B5CF6 75%,#EC4899 100%)",

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",

      textShadow:
        "0px 0px 50px rgba(96,165,250,0.35)",

      mb: 2,
    }}
  >
                Track. Focus. Achieve.

              </Typography>

              <Typography
                sx={{
                  mt: 4,
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "1.2rem",
                  maxWidth: 650,
                  lineHeight: 1.8,
                }}
              >
                A modern student productivity dashboard
                to track subjects, manage exams,
                achieve daily goals and maintain
                study consistency with focus sessions.
              </Typography>

              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "16px",
                    background:
                      "linear-gradient(90deg,#60A5FA,#8B5CF6)",
                  }}
                  onClick={() =>
                    navigate("/dashboard")
                  }
                >
                  Open Dashboard
                </Button>


              </Box>
            </Box>
          </Box>

          {/* FEATURES */}

<Box
  id="features"
  textAlign="center"
  mt={2}
  mb={3}
>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 800,
              }}
            >
              Study Smarter
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid item xs={12} md={3} key={feature.title}>
                <Card
                  sx={{
                    height: "100%",
                    background:
                      "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "24px",
                    color: "white",

                    "&:hover": {
                      transform:
                        "translateY(-8px)",
                    },

                    transition:
                      "all 0.3s ease",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        mb: 2,
                        color: "#60A5FA",
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          "rgba(255,255,255,0.7)",
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* CTA */}

          <Box
            sx={{
              py: 12,
              textAlign: "center",
            }}
          >
            <LocalFireDepartmentIcon
              sx={{
                fontSize: 70,
                color: "#F59E0B",
              }}
            />

            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 800,
                mt: 2,
              }}
            >
              Ready To Build Your Study Streak?
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color:
                  "rgba(255,255,255,0.7)",
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Manage subjects, exams, goals,
              and focus sessions from one
              beautiful dashboard.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                px: 5,
                py: 1.5,
                borderRadius: "16px",
                background:
                  "linear-gradient(90deg,#60A5FA,#8B5CF6)",
              }}
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Start Studying
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}