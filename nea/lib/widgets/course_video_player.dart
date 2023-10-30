import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';

class CourseVideoPlayer extends StatefulWidget {
  final String video;
  const CourseVideoPlayer({super.key, required this.video});

  @override
  State<CourseVideoPlayer> createState() => _CourseVideoPlayerState();
}

class _CourseVideoPlayerState extends State<CourseVideoPlayer> {
  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;
  late ChewieController chewieController;

  @override
  void initState() {
    super.initState();

    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.asset(widget.video);

    _initializeVideoPlayerFuture = _controller.initialize();
    chewieController = ChewieController(
      videoPlayerController: _controller,
      autoPlay: false,
      looping: false,
    );
  }

  @override
  void dispose() {
    // Ensure disposing of the VideoPlayerController to free up resources.
    _controller.dispose();
    chewieController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Complete the code in the next step.
    return FutureBuilder(
      future: _initializeVideoPlayerFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          // If the VideoPlayerController has finished initialization, use
          // the data it provides to limit the aspect ratio of the video.
          return AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              // Use the VideoPlayer widget to display the video.
              // child: VideoPlayer(_controller),
              child: Chewie(
                controller: chewieController,
              ));
        } else {
          // If the VideoPlayerController is still initializing, show a
          // loading spinner.
          return Container(
            height: 100,
            color: primaryColor.withOpacity(0.5),
            child: const Center(
              child: CircularProgressIndicator(),
            ),
          );
        }
      },
    );
  }
}
