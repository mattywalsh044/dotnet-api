using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/photos")]
public class PhotoController : ControllerBase
{
    private readonly CloudinaryService _cloudinary;

    public PhotoController(CloudinaryService cloudinary)
    {
        _cloudinary = cloudinary;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        var url = await _cloudinary.UploadImageAsync(file);
        return Ok(new { imageUrl = url });
    }
}
