import React, { useState, useEffect } from "react";

import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

import { motion } from "framer-motion";

function App() {
  // ---------------- SUBJECTS ----------------
const [subjectDialogOpen, setSubjectDialogOpen] =
  useState(false);
const [editSubject, setEditSubject] =
  useState(null);
const [goalDialogOpen, setGoalDialogOpen] =
  useState(false);
const [newCompleted, setNewCompleted] =
  useState("");
const [examDialogOpen, setExamDialogOpen] =
  useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [totalChapters, setTotalChapters] = useState("");
  const [completedChapters, setCompletedChapters] = useState("");
const [openGoalsDialog, setOpenGoalsDialog] =
  useState(false);
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subjects")) || []
  );

  // ---------------- EXAMS ----------------

  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");

  const [exams, setExams] = useState(
    JSON.parse(localStorage.getItem("exams")) || []
  );

  // ---------------- GOALS ----------------

  const [goalText, setGoalText] = useState("");

  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );

  // ---------------- STREAK ----------------

  const [streak, setStreak] = useState(
    Number(localStorage.getItem("streak")) || 0
  );

  // ---------------- TIMER ----------------

  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);

  // ---------------- LOCAL STORAGE ----------------

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("exams", JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // ---------------- TIMER ----------------

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ---------------- ADD SUBJECT ----------------

  const addSubject = () => {
    if (
      !subjectName ||
      !totalChapters ||
      !completedChapters
    )
      return;

    const progress = Math.round(
      (completedChapters / totalChapters) * 100
    );

    const newSubject = {
      id: Date.now(),
      name: subjectName,
      total: totalChapters,
      completed: completedChapters,
      progress,
    };

    setSubjects([...subjects, newSubject]);

    setSubjectName("");
    setTotalChapters("");
    setCompletedChapters("");
  };

  // ---------------- ADD EXAM ----------------

  const addExam = () => {
    if (!examName || !examDate) return;

    setExams([
      ...exams,
      {
        id: Date.now(),
        name: examName,
        date: examDate,
      },
    ]);

    setExamName("");
    setExamDate("");
  };

  // ---------------- ADD GOAL ----------------

  const addGoal = () => {
    if (!goalText) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        text: goalText,
        completed: false,
      },
    ]);

    setGoalText("");
  };

  // ---------------- TOGGLE GOAL ----------------

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: !goal.completed,
            }
          : goal
      )
    );
  };
// ---------------- DELETE SUBJECT ----------------

const deleteSubject = (id) => {
  setSubjects(
    subjects.filter(
      (subject) => subject.id !== id
    )
  );
};

// ---------------- DELETE EXAM ----------------

const deleteExam = (id) => {
  setExams(
    exams.filter(
      (exam) => exam.id !== id
    )
  );
};

// ---------------- DELETE GOAL ----------------

const deleteGoal = (id) => {
  setGoals(
    goals.filter(
      (goal) => goal.id !== id
    )
  );
};
  // ---------------- STREAK ----------------

  const markStudied = () => {
    const latest = streak + 1;

    setStreak(latest);

    localStorage.setItem("streak", latest);
  };

  // ---------------- CARD STYLE ----------------

const cardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "24px",
  color: "white",

  p: 3,

  height: "100%",

  display: "flex",
  flexDirection: "column",

  boxShadow:
    "0 8px 32px rgba(0,0,0,0.4)",

  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      "0 12px 40px rgba(59,130,246,0.3)",
  },
};
const dialogStyle = {
  background:
    "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  color: "white",
  boxShadow:
    "0 20px 60px rgba(0,0,0,0.5)",
};

const dialogTitleStyle = {
  fontSize: "1.25rem",
  fontWeight: 700,
  textAlign: "center",
  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
};

const dialogContentStyle = {
  p: 3,
};

const dialogActionsStyle = {
  p: 3,
  borderTop:
    "1px solid rgba(255,255,255,0.08)",
};

const dialogButtonStyle = {
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 600,
  px: 3,
};

const inputStyle = {
  mt: 2,

  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
  },
};
  return (
    
<Box
  sx={{
    minHeight: "84vh",
    position: "relative",
    overflow: "hidden",

    backgroundImage: `
      linear-gradient(
        135deg,
        rgba(55, 57, 65, 0.95) 10%,
        rgba(5,8,22,0.75) 50%,
        rgba(5,8,22,0.95) 100%
      ),
      url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f")
    `,

    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
>
        {/* Animated Background */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -800],
              opacity: [0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + i,
            }}
            style={{
              position: "absolute",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#60A5FA",
              bottom: 0,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Glow Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
          }}
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            position: "absolute",
            right: -200,
            top: 50,
            background:
              "radial-gradient(circle,#3B82F640,transparent)",
            filter: "blur(120px)",
          }}
        />

        {/* HERO */}
<Container
  maxWidth={false}
  sx={{
    pt: 4,
    px: { xs: 2, md: 6 },
    width: "100%",
  }}
>
        {/* HEADER */}

<Box
  mb={8}
  sx={{
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Glow Background */}

  <Box
    sx={{
      position: "absolute",
      top: -100,
      left: -100,
      width: 400,
      height: 400,
      background:
        "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
      filter: "blur(90px)",
      zIndex: 0,
    }}
  />


  {/* Main Title */}

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

  {/* Subtitle */}
</Box>

{/* ===== ROW 1 : SUMMARY CARDS ===== */}
<Paper
  sx={{
    ...cardStyle,
    mb: 3,
    p: 4,
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
      textAlign: "center",
    }}
  >
    <Box flex={1}>
           <Typography
        variant="h5"
      sx={{
    fontWeight: 700,
  }}
      color="#94A3B8">
        Subjects
      </Typography>


<Typography
  sx={{
    fontSize: "4rem",
    fontWeight: 700,
    color: "#60A5FA",
  }}
>
  {subjects.length}
</Typography>
    </Box>

    <Divider
      orientation="vertical"
      flexItem
      sx={{
        borderColor: "rgba(255,255,255,0.1)",
      }}
    />

    <Box flex={1}>
          <Typography
        variant="h5"
      sx={{
    fontWeight: 700,
  }}
       color="#94A3B8">
        Exams
      </Typography>

      <Typography
        variant="h2"
        sx={{
          color: "#F59E0B",
              fontSize: "4rem",
    fontWeight: 700,
        }}
      >
        {exams.length}
      </Typography>
    </Box>

    <Divider
      orientation="vertical"
      flexItem
      sx={{
        borderColor: "rgba(255,255,255,0.1)",
      }}
    />

    <Box flex={1}>
           <Typography
        variant="h5"
      sx={{
    fontWeight: 700,
  }}
       color="#94A3B8">
        Goals
      </Typography>

      <Typography
        variant="h2"
        sx={{
          color: "#A855F7",
  fontSize: "4rem",
    fontWeight: 700,
        }}
      >
        {goals.length}
      </Typography>
    </Box>

    <Divider
      orientation="vertical"
      flexItem
      sx={{
        borderColor: "rgba(255,255,255,0.1)",
      }}
    />

    <Box flex={1}>
            <Typography
        variant="h5"
      sx={{
    fontWeight: 700,
  }}
      color="#94A3B8">
        Streak
      </Typography>

<Typography
  sx={{
    fontSize: "4rem",
    fontWeight: 700,
    color: "#4ADE80",
  }}
>
    🔥 {streak}
</Typography>
    </Box>
  </Box>
</Paper>
<Grid container spacing={3} sx={{ mb: 3 }}>
          {/* STREAK */}

<Paper
  sx={{
    ...cardStyle,
    width: "100%",
    mb: 4,
    p: 4,
    minHeight: 320,
  }}
>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        lg: "1fr 2fr 1fr",
      },
      gap: 4,
      alignItems: "center",
      width: "100%",
    }}
  >
    {/* STUDY STREAK */}

    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <LocalFireDepartmentIcon
        sx={{
          fontSize: 50,
          color: "#F59E0B",
          mb: 1,
        }}
      />

      <Typography
        variant="h5"
      sx={{
    fontWeight: 700,
  }}
      >
        Study Streak
      </Typography>

      <Typography
        variant="h1"
        sx={{
             fontSize: "4rem",
    fontWeight: 700,
          color: "#4ADE80",
        }}
      >
        {streak}
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: "14px",
          textTransform: "none",
        }}
        onClick={markStudied}
      >
        Studied Today
      </Button>
    </Box>

    {/* TIMER */}

    <Box
      sx={{
        textAlign: "center",
        borderLeft: {
          lg: "1px solid rgba(255,255,255,0.1)",
        },
        borderRight: {
          lg: "1px solid rgba(255,255,255,0.1)",
        },
        px: 4,
      }}
    >
      <TimerIcon
        sx={{
          fontSize: 55,
          color: "#4ADE80",
          mb: 1,
        }}
      />

      <Typography
        variant="h5"
      sx={{
    fontWeight: 700,
  }}
      >
        Focus Timer
      </Typography>

<Typography
  sx={{
    fontSize: "4rem",
    fontWeight: 700,
    color: "#4ADE80",

    mb: 3,
  }}
>
  {formatTime()}
</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => setRunning(true)}
        >
          Start
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() => setRunning(false)}
        >
          Pause
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setRunning(false);
            setSeconds(1500);
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>

    {/* DAILY GOALS */}
<Box
  sx={{
    textAlign: "center",
  }}
>
<TrackChangesIcon
  sx={{
    fontSize: 50,
    color: "#A855F7",
    mb: 1,
  }}
/>

  <Typography
    variant="h5"
    sx={{
    fontWeight: 700,
  }}
  >
    Daily Goals
  </Typography>

<Typography
  sx={{
    fontSize: "4rem",
    fontWeight: 700,
    color: "#A855F7",
  }}
>
  {goals.length}
</Typography>

<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mt: 2,
    alignItems: "center",
  }}
>
  <Button
    variant="contained"
    sx={{
      width: "200px",
      borderRadius: "14px",
      textTransform: "none",
      fontWeight: "bold",
      py: 1,
    }}
    onClick={() =>
      setGoalDialogOpen(true)
    }
  >
    Add Goal
  </Button>

  <Button
    variant="outlined"
    sx={{
      width: "200px",
      borderRadius: "14px",
      textTransform: "none",
      fontWeight: "bold",
      color: "white",
      borderColor: "#60A5FA",

      "&:hover": {
        borderColor: "#60A5FA",
        background:
          "rgba(96,165,250,0.08)",
      },
    }}
    onClick={() =>
      setOpenGoalsDialog(true)
    }
  >
    View Goals
  </Button>
</Box>
</Box>
  </Box>
</Paper>
<Paper
  sx={{
    ...cardStyle,
    width: "100%",
    p: 4,
    mb: 4,
    minHeight: 600,
  }}
>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        md: "1fr 1fr",
      },
      gap: 4,
      height: "100%",
    }}
  >
    {/* SUBJECTS */}

    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
 <Typography
  variant="h5"
  sx={{
    fontWeight: 700,
  }}
>
  📚 Subjects
</Typography>


        <Button
          variant="contained"
          onClick={() =>
            setSubjectDialogOpen(true)
          }
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          + Add Subject
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {subjects.length === 0 ? (
        <Typography color="gray">
          No subjects added
        </Typography>
      ) : (
        subjects.map((subject) => (
          <Paper
            key={subject.id}
            sx={{
              p: 2,
              mb: 2,
              background:
                "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              color: "white",
            }}
          >
<Typography
  sx={{
    fontSize: "1rem",
    fontWeight: 600,
  }}
>
  {subject.name}
</Typography>

            <Typography
              sx={{
                color: "#94A3B8",
                mb: 1,
              }}
            >
              {subject.completed}/{subject.total}
              {" "}Chapters
            </Typography>

            <LinearProgress
              variant="determinate"
              value={subject.progress}
              sx={{
                height: 10,
                borderRadius: 10,
                backgroundColor:
                  "rgba(255,255,255,0.1)",

                "& .MuiLinearProgress-bar": {
                  borderRadius: 10,
                  background:
                    "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                },
              }}
            />

            <Typography
              mt={1}
              sx={{
                color: "#60A5FA",
                fontWeight: "bold",
              }}
            >
              {subject.progress}% Complete
            </Typography>

<Box
  sx={{
    display: "flex",
    gap: 1,
    mt: 2,
  }}
>
  <Button
    size="small"
    variant="outlined"
    sx={{
      borderColor: "#60A5FA",
      color: "#60A5FA",
      textTransform: "none",
    }}
    onClick={() => {
      setEditSubject(subject);
      setNewCompleted(
        subject.completed
      );
    }}
  >
    Update Progress
  </Button>

  {subject.progress === 100 && (
    <Button
      size="small"
      color="error"
      variant="outlined"
      onClick={() => {
        if (
          window.confirm(
            "Delete this subject?"
          )
        ) {
          deleteSubject(subject.id);
        }
      }}
    >
      Delete
    </Button>
  )}
</Box>
          </Paper>
        ))
      )}
    </Box>

    {/* EXAMS */}

    <Box
      sx={{
        borderLeft: {
          md:
            "1px solid rgba(255,255,255,0.1)",
        },
        pl: {
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
<Typography
  variant="h5"
  sx={{
    fontWeight: 700,
  }}
>
  ⏳ Exams
</Typography>

        <Button
          variant="contained"
          onClick={() =>
            setExamDialogOpen(true)
          }
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          + Add Exam
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {exams.length === 0 ? (
        <Typography color="gray">
          No exams added
        </Typography>
      ) : (
        exams.map((exam) => {
          const diff = Math.ceil(
            (new Date(exam.date) -
              new Date()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <Paper
              key={exam.id}
              sx={{
                p: 2,
                mb: 2,
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                color: "white",
              }}
            >
 <Typography
  sx={{
    fontSize: "1rem",
    fontWeight: 600,
  }}
>
  {exam.name}
</Typography>

<Typography
  sx={{
    mt: 1,
    color:
      diff <= 7
        ? "#EF4444"
        : "#4ADE80",
    fontWeight: "bold",
  }}
>
  {diff} Days Left
</Typography>

{diff <= 0 && (
  <Button
    size="small"
    color="error"
    variant="outlined"
    sx={{
      mt: 2,
    }}
    onClick={() => {
      if (
        window.confirm(
          "Delete this exam?"
        )
      ) {
        deleteExam(exam.id);
      }
    }}
  >
    Remove
  </Button>
)}
            </Paper>
          );
        })
      )}
    </Box>
  </Box>
</Paper>
        </Grid>

<Dialog
  open={subjectDialogOpen}
  onClose={() =>
    setSubjectDialogOpen(false)
  }
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: dialogStyle,
  }}
>
  <DialogTitle sx={dialogTitleStyle}>
    📚 Add Subject
  </DialogTitle>

  <DialogContent sx={dialogContentStyle}>
    <TextField
      fullWidth
      label="Subject Name"
      value={subjectName}
      sx={inputStyle}
      onChange={(e) =>
        setSubjectName(e.target.value)
      }
    />

    <TextField
      fullWidth
      type="number"
      label="Total Chapters"
      value={totalChapters}
      sx={inputStyle}
      onChange={(e) =>
        setTotalChapters(e.target.value)
      }
    />

    <TextField
      fullWidth
      type="number"
      label="Completed Chapters"
      value={completedChapters}
      sx={inputStyle}
      onChange={(e) =>
        setCompletedChapters(
          e.target.value
        )
      }
    />
  </DialogContent>

  <DialogActions sx={dialogActionsStyle}>
    <Button
      sx={dialogButtonStyle}
      onClick={() =>
        setSubjectDialogOpen(false)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      sx={dialogButtonStyle}
      onClick={() => {
        addSubject();
        setSubjectDialogOpen(false);
      }}
    >
      Add Subject
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={examDialogOpen}
  onClose={() =>
    setExamDialogOpen(false)
  }
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: dialogStyle,
  }}
>
  <DialogTitle sx={dialogTitleStyle}>
    ⏳ Add Exam
  </DialogTitle>

  <DialogContent sx={dialogContentStyle}>
    <TextField
      fullWidth
      label="Exam Name"
      value={examName}
      sx={inputStyle}
      onChange={(e) =>
        setExamName(e.target.value)
      }
    />

    <TextField
      fullWidth
      type="date"
      value={examDate}
      sx={inputStyle}
      onChange={(e) =>
        setExamDate(e.target.value)
      }
    />
  </DialogContent>

  <DialogActions sx={dialogActionsStyle}>
    <Button
      sx={dialogButtonStyle}
      onClick={() =>
        setExamDialogOpen(false)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      sx={dialogButtonStyle}
      onClick={() => {
        addExam();
        setExamDialogOpen(false);
      }}
    >
      Add Exam
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={goalDialogOpen}
  onClose={() =>
    setGoalDialogOpen(false)
  }
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: dialogStyle,
  }}
>
  <DialogTitle sx={dialogTitleStyle}>
    🎯 Add Goal
  </DialogTitle>

  <DialogContent sx={dialogContentStyle}>
    <TextField
      fullWidth
      label="Goal"
      value={goalText}
      sx={inputStyle}
      onChange={(e) =>
        setGoalText(e.target.value)
      }
    />
  </DialogContent>

  <DialogActions sx={dialogActionsStyle}>
    <Button
      sx={dialogButtonStyle}
      onClick={() =>
        setGoalDialogOpen(false)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      sx={dialogButtonStyle}
      onClick={() => {
        addGoal();
        setGoalDialogOpen(false);
      }}
    >
      Add Goal
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={Boolean(editSubject)}
  onClose={() =>
    setEditSubject(null)
  }
  maxWidth="xs"
  fullWidth
  PaperProps={{
    sx: dialogStyle,
  }}
>
  <DialogTitle sx={dialogTitleStyle}>
    📈 Update Progress
  </DialogTitle>

  <DialogContent sx={dialogContentStyle}>
    <Typography
      sx={{
        mb: 2,
        fontWeight: 600,
      }}
    >
      {editSubject?.name}
    </Typography>

    <TextField
      fullWidth
      type="number"
      label="Completed Chapters"
      value={newCompleted}
      sx={inputStyle}
      onChange={(e) =>
        setNewCompleted(
          e.target.value
        )
      }
    />
  </DialogContent>

  <DialogActions sx={dialogActionsStyle}>
    <Button
      sx={dialogButtonStyle}
      onClick={() =>
        setEditSubject(null)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      sx={dialogButtonStyle}
      onClick={() => {
        setSubjects(
          subjects.map((s) =>
            s.id === editSubject.id
              ? {
                  ...s,
                  completed:
                    Number(newCompleted),
                  progress: Math.round(
                    (Number(
                      newCompleted
                    ) /
                      s.total) *
                      100
                  ),
                }
              : s
          )
        );

        setEditSubject(null);
      }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={goalDialogOpen}
  onClose={() =>
    setGoalDialogOpen(false)
  }
  maxWidth="sm"
  fullWidth
>
<DialogTitle
  sx={{
    fontSize: "1.25rem",
    fontWeight: 700,
  }}
>
    Add Daily Goal
  </DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      label="Goal"
      value={goalText}
      sx={{ mt: 2 }}
      onChange={(e) =>
        setGoalText(e.target.value)
      }
    />
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() =>
        setGoalDialogOpen(false)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={() => {
        addGoal();
        setGoalDialogOpen(false);
      }}
    >
      Add Goal
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={openGoalsDialog}
  onClose={() => setOpenGoalsDialog(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: dialogStyle,
  }}
>
  <DialogTitle sx={dialogTitleStyle}>
    🎯 My Goals
  </DialogTitle>

  <DialogContent sx={dialogContentStyle}>
    {goals.length === 0 ? (
      <Typography color="gray">
        No goals added yet.
      </Typography>
    ) : (
      goals.map((goal) => (
        <Box
          key={goal.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            mb: 2,
            borderRadius: "14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoal(goal.id)}
            />

            <Typography
              sx={{
                textDecoration: goal.completed
                  ? "line-through"
                  : "none",
                color: goal.completed
                  ? "#4ADE80"
                  : "white",
                fontWeight: 500,
              }}
            >
              {goal.text}
            </Typography>
          </Box>

          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => deleteGoal(goal.id)}
          >
            Delete
          </Button>
        </Box>
      ))
    )}
  </DialogContent>

  <DialogActions sx={dialogActionsStyle}>
    <Button
      sx={dialogButtonStyle}
      onClick={() => setOpenGoalsDialog(false)}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
      </Container>

    </Box>
  );
}

export default App;
