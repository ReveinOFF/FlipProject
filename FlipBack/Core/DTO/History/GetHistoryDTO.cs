namespace Core.DTO.History
{
    public class GetHistoryDTO
    {
        public string Id { get; set; }
        public string UserImage { get; set; }
        public string NameUser { get; set; }
        public DateTime DateCreate { get; set; }
        public string File { get; set; }
    }
}
