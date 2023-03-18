namespace Core.DTO.History
{
    public class GetHistoryDTO
    {
        public int Id { get; set; }
        public string UserImage { get; set; }
        public string NameUser { get; set; }
        public DateTime DateCreate { get; set; }
        public ICollection<string> Files { get; set; }
    }
}
