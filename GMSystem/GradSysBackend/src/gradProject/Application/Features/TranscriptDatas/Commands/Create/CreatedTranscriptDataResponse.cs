using NArchitecture.Core.Application.Responses;

namespace Application.Features.TranscriptDatas.Commands.Create;

public class CreatedTranscriptDataResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public decimal ParsedGpa { get; set; }
    public int ParsedEcts { get; set; }
    public bool IsValidForProcessing { get; set; }
}