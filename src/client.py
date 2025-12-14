import torch
import cv2
import numpy as np


def run() -> None:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"device={device}")

    # Create something on GPU (if available) and *send to CPU*.
    # Use int16 so "* 5" doesn't overflow.
    t = torch.randint(
        low=0,
        high=52,  # 0..51; after *5 -> 0..255
        size=(360, 640, 3),
        dtype=torch.int16,
        device=device,
    )

    t_cpu = t.cpu()          # send tensor to cpu
    t_cpu = t_cpu * 5        # multiply it by 5

    img = t_cpu.clamp(0, 255).to(torch.uint8).numpy()  # (360,640,3) uint8
    img = np.ascontiguousarray(img)

    cv2.imshow("foo", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


if __name__ == "__main__":
    run()
