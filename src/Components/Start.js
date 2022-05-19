import React from "react";
import ReactPlayer from "react-player/youtube";
import { Container, Box, Grid, Paper, Typography } from "@mui/material";
function Start() {
  return (
    <Container maxWidth="lg" sx={{ minWidth: "95vw" }}>
      <Box position="relative">
        <ReactPlayer
          controls
          url="https://youtu.be/170NuiBpXG4"
          width="100%"
          style={{ marginTop: 10 }}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                mb={2}
                sx={{ bgcolor: "primary.main", pl: 1 }}
              >
                Vision
              </Typography>
              <Typography variant="h5" component="p">
                To be a leading{" "}
                <span style={{ fontWeight: "600", color: "green" }}>GREEN</span>{" "}
                institution of higher learning in the global community by 2030.
              </Typography>
              <img
                src="img/vision.png"
                alt="vision"
                style={{ width: "100%" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                mb={2}
                sx={{ bgcolor: "primary.main", pl: 1 }}
              >
                Mission
              </Typography>
              <Typography variant="body1" component="p">
                We are a{" "}
                <span style={{ fontWeight: "600", color: "green" }}>GREEN</span>{" "}
                institution committed to empower the youth and life-long
                learners who will contribute to nation building and global
                transformation through quality instruction, inclusive and
                creative teaching-learning pedagogies, relevant research, social
                innovation, dynamic partnership, and active civic engagement, in
                a conducive and fulfilling environment for students, faculty,
                staff, and partners.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                mb={2}
                sx={{ bgcolor: "primary.main", pl: 1 }}
              >
                Core Values
              </Typography>
              <Typography variant="h5" component="p">
                <span style={{ fontWeight: "600", color: "green" }}>Ex</span>
                cellence
                <br />
                <span style={{ fontWeight: "600", color: "green" }}>C</span>
                ompassion
                <br />
                <span style={{ fontWeight: "600", color: "green" }}>E</span>
                nvironment
                <br />
                <span style={{ fontWeight: "600", color: "green" }}>L</span>
                ove of country
                <br />
                <span style={{ fontWeight: "600", color: "green" }}>S</span>
                ervice
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                mb={2}
                sx={{ bgcolor: "primary.main", pl: 1 }}
              >
                Core Attributes
              </Typography>
              <Typography variant="h5" component="p">
                Competent Worker
                <br /> Compassionate Being
                <br /> Environmentally Responsible
                <br /> Nation-builder
                <br /> Engaged Citizen
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                mb={2}
                sx={{ bgcolor: "primary.main", pl: 1 }}
              >
                Quality Policy
              </Typography>
              <Typography variant="body1" component="p">
                We commit to deliver quality higher education services in
                conformance with established standards through competent Human
                Resource and Functional Systems adherent to the principle of
                continual improvement for customers' satisfaction.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Start;
