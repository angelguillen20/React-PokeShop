
import Ratio from 'react-bootstrap/Ratio';

function VideoUser() {
  return (
    <div style={{ width: "auto", height: 'auto' }}>
      <Ratio aspectRatio="16x9">
        <embed type="video/mp4" src="/img/videos/VideoPokeball.mp4" />
      </Ratio>
    </div>
  );
}

export default VideoUser;