const player = new Plyr('#voe-player');
            player.on('ready', function () {
                var video = document.getElementById('voe-player');
                window.SubtitlesOctopusOnLoad = function() {
                    var options = {
                        video: video,
                        subUrl: 'https://libass.github.io/JavascriptSubtitlesOctopus/subtitles/test.ass',
                        fonts: ['https://libass.github.io/JavascriptSubtitlesOctopus/fonts/Arial.ttf', '/JavascriptSubtitlesOctopus/fonts/TimesNewRoman.ttf'],
                        //onReady: onReadyFunction,
                        //debug: true,
                        workerUrl: 'https://libass.github.io/JavascriptSubtitlesOctopus/assets/js/subtitles-octopus-worker.js'
                    };
                    window.octopusInstance = new SubtitlesOctopus(options); // You can experiment in console
                };
                if (SubtitlesOctopus) {
                    SubtitlesOctopusOnLoad();
                }
            });
