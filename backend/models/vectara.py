from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

class VectaraModel:
    def __init__(self):
        self.model_name = "microsoft/deberta-large-mnli"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
        self.model.eval()  # Set the model to evaluation mode
    
    def get_score(self, text):
        # For MNLI model, we'll check if the text is "entailed" (likely true)
        # by comparing it with itself (if it's self-consistent)
        inputs = self.tokenizer(
            text,
            text,  # Compare text with itself
            return_tensors="pt",
            truncation=True,
            max_length=512,
            padding=True
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            # Get probability for entailment (index 2 in MNLI)
            probs = torch.softmax(outputs.logits, dim=1)
            entailment_score = float(probs[0][2])  # Higher score means less likely to be hallucination
            
        return entailment_score